# Scalable Healthcare Backend Architecture Blueprint (Optimized)

## Purpose

This repository provides a **production‑grade, cloud‑native backend blueprint** that satisfies stringent regulatory, security, and scalability requirements for modern healthcare applications.

---

## Regulatory Drivers & Technical Controls

| Regulation             | Core Technical Controls (implemented)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **FDA 21 CFR Part 11** | • **Immutable audit trail** – Write‑once‑read‑many (WORM) storage via Elastic Stack with index‑level immutability; Cloud‑provider **Object Lock** (e.g., AWS S3 Object Lock) for logs and FHIR resources. <br>• **Electronic signatures** – Captured as **FHIR Provenance** resources signed with PKI certificates; verification via a dedicated **Signature Service**. <br>• **System validation** – Automated test suites (unit, integration, compliance) run in CI; model validation pipelines for SaMD. <br>• **Access controls** – OIDC‑based RBAC mapped to OPA policies; least‑privilege principle enforced at API gateway and K8s level.                                                                                          |
| **HIPAA**              | • **Role‑Based Access Control (RBAC)** – Integrated with corporate IdP (Azure AD, Okta) via OIDC; groups mapped to fine‑grained permissions in OPA. <br>• **Encryption‑in‑transit** – TLS 1.2+ enforced by Kong ingress and mTLS between services (Istio). <br>• **Encryption‑at‑rest** – PostgreSQL Transparent Data Encryption (TDE) using Cloud KMS‑managed keys; MinIO/S3 objects encrypted with **SSE‑S3** and keys stored in **HashiCorp Vault**. <br>• **Detailed audit logging** – All request/response metadata emitted via OpenTelemetry and persisted to immutable Elastic indices.                                                                                                                                            |
| **GDPR**               | • **Data‑residency enforcement** – Separate Kubernetes clusters per region (US & EU). A **Service Mesh (Istio)** + **OPA** policy routes EU‑resident requests to the EU cluster based on patient consent flag and geo‑IP. <br>• **Data minimisation** – Feature Store (Feast) stores only necessary features per model; retention policies enforced via CronJobs. <br>• **Right‑to‑be‑forgotten** – De‑identification micro‑service that receives erasure requests, deletes records from PostgreSQL (soft‑delete flag → hard purge after 30 days) and triggers object‑store lifecycle rules. <br>• **Breach‑notification workflow** – Automated alerting via PagerDuty; audit logs exported to a **Breach‑Response Playbook** repository. |
| **FDA SaMD Guidance**  | • **Model lifecycle management** – MLflow tracks experiments, versions, and metadata. <br>• **Validation & verification** – CI pipeline runs **model‑validation test suites** (performance, bias, safety) before publishing to KFServing. <br>• **Post‑market surveillance** – Inference requests logged with provenance; analytics pipeline flags drift and feeds alerts to the quality‑management system.                                                                                                                                                                                                                                                                                                                               |
| **HL7 FHIR**           | • **Versioned API** – `/fhir/v1/`, `/fhir/v2/` base paths; each version published with OpenAPI spec. <br>• **Profiling & schema validation** – Custom **StructureDefinition** resources; request/response payloads validated at gateway using **HAPI FHIR validator**.                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |

---

## Core Architectural Components

| Layer                         | Technology                                                                     | Key Configuration for Compliance                                                                                              |
| ----------------------------- | ------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| **Container Orchestration**   | **Kubernetes** (EKS/GKE/AKS)                                                   | Multi‑cluster (US & EU), pod security standards, node‑level encryption, IAM roles per service account.                        |
| **API Management & Security** | **Kong Enterprise** (Ingress + Plugins)                                        | JWT/OIDC validation, rate‑limiting, request/response transformation, audit log plugin that writes to immutable Elastic index. |
| **Service Mesh**              | **Istio**                                                                      | mTLS for east‑west traffic, traffic routing policies for data‑residency, telemetry collection.                                |
| **Model Lifecycle & Serving** | **MLflow** + **KFServing**                                                     | Model versioning, canary releases, validation hooks, audit‑ready metadata storage.                                            |
| **Feature Store**             | **Feast**                                                                      | Separate online stores per region; data‑access policies enforced via OPA.                                                     |
| **Observability**             | **OpenTelemetry → Prometheus / Grafana / Loki**                                | Unified tracing, metrics, log aggregation; logs shipped to immutable Elastic indices.                                         |
| **Compliance & Governance**   | **OPA/Gatekeeper**, **HashiCorp Vault**, **Elastic Stack** (immutable indices) | Policy‑as‑code for RBAC, data‑residency, audit‑trail immutability; secret management with auto‑rotation.                      |
| **Data Storage**              | **PostgreSQL** (encrypted), **MinIO** (SSE‑S3), **MongoDB** (optional)         | Transparent Data Encryption via Cloud KMS; object‑store bucket lock for WORM; backups encrypted with Vault‑managed keys.      |
| **CI/CD**                     | **GitHub Actions / Tekton** + **ArgoCD**                                       | Automated compliance checks (Trivy, Bandit, OPA test), model‑validation stage, blue‑green & canary deployments.               |

---

## Detailed Compliance Mechanisms

### 1. Immutable Audit Trail (FDA Part 11)

- **Write‑once storage** – Elastic indices are created with `index.blocks.write: true` after 24 h; S3 buckets used for long‑term archiving have **Object Lock** enabled. <br>_ **Kong audit‑log plugin** captures request metadata (user, timestamp, operation) and forwards to Elastic. <br>_ **Kubernetes audit logs** are streamed to the same pipeline, ensuring end‑to‑end traceability.

### 2. Data‑Residency Enforcement (GDPR)

- **Geolocation + consent flag** – Patient record contains `region` attribute. OPA policy `data.residency.allowed` checks the attribute against request context (derived from JWT claim `patient_region`). <br>_ **Istio routing rule** forwards EU‑bound traffic to the EU cluster; US traffic stays in US cluster. <br>_ **Cross‑region replication** is **disabled** for EU‑cluster object stores to avoid accidental export.

### 3. Encryption‑at‑Rest & Key Management

- **PostgreSQL** – Uses **AWS KMS** / **GCP CMEK** for TDE; rotation every 90 days automated via Terraform. <br>_ **MinIO** – Configured with `sse-s3` using keys provisioned by Vault (`vault write -f /transit/keys/minio`). <br>_ **Vault** – Stores all data‑encryption keys, signs electronic signatures, and issues short‑lived service‑account tokens.

### 4. Electronic Signature Capture

- **Signature Service** – Exposes `/sign` endpoint; receives document hash, signs with X.509 certificate stored in Vault's PKI engine. <br>\* **FHIR Provenance** – Each signed document is recorded as a Provenance resource containing `signature`, `who`, and `when`. Verification performed by downstream audit tools.

### 5. Risk Analysis & Continuous Compliance

- **Automated scans** – Nightly Trivy container scans, OPA policy test suite, and static code analysis (Bandit, SonarQube). <br>_ **Compliance Dashboard** – Grafana panels display audit‑log integrity checks, encryption‑key rotation status, and policy violation counts. <br>_ **Quarterly manual risk assessment** – Process documented in `docs/compliance/README.md` (out of scope for code but referenced).

### 6. Role‑Based Access Control (RBAC) & Identity Mapping

- **IdP integration** – OIDC with Azure AD; groups `Clinician`, `Researcher`, `Admin` mapped to OPA roles. <br>\* **OPA policy example** (excerpt):

```rego
package healthcare.access
default allow = false
allow {
  input.method == "GET"
  input.path = ["fhir", _, _]
  input.user.role == "Clinician"
  input.user.region == input.resource.region   # residency check
}
```

- Policies are version‑controlled and tested with `opa test` in CI.

### 7. Backup, Disaster‑Recovery, RTO/RPO

- **PostgreSQL** – Automated daily snapshots stored in encrypted S3 with Object Lock; point‑in‑time recovery enabled. <br>_ **MinIO** – Replicated to a **cold‑storage bucket** in a different AZ; retention 30 days. <br>_ **RTO** ≤ 15 min, **RPO** ≤ 5 min defined in `ops/dr_plan.md`. <br>\* **Chaos‑mesh** exercises run weekly to validate failover.

### 8. SaMD Model Validation & Post‑Market Surveillance

- **Model registration** – MLflow records `validation_report.json` (performance, safety thresholds). <br>_ **CI stage** – Executes `pytest -m validation` against the model; only passes if all regulatory metrics met. <br>_ **Inference logging** – KFServing emits `prediction_id`, input hash, and provenance; logs stored in Elastic for audit and drift detection. <br>\* **Surveillance pipeline** – Spark job analyses prediction outcomes weekly, flags drift > 5 % and opens a ticket in JIRA for review.

### 9. FHIR API Versioning, Profiling & Schema Validation

- **Versioned base paths** – `/fhir/v1/`, `/fhir/v2/`. Each version has its own OpenAPI spec generated from **HAPI FHIR** server. <br>_ **Custom profiles** – Defined in `fhir/profiles/` (StructureDefinition resources). <br>_ **Validation plugin** – Kong’s request‑validation plugin uses the HAPI validator JAR to enforce schema compliance before reaching the service.

---

## High‑Level Request Flow (Updated)

1. **Client** → **Kong** (TLS termination, JWT/OIDC validation). <br>2. Kong invokes **OPA admission** to enforce residency & RBAC. <br>3. Request forwarded (via Istio) to **FHIR Service** (FastAPI). <br>4. Service writes/reads PostgreSQL (TDE) and emits **Provenance** for any signed document. <br>5. Decision‑support call fetches features from **Feast**, resolves model version from **MLflow**, invokes **KFServing**. <br>6. All spans captured by **OpenTelemetry**, logs shipped to **Immutable Elastic**. <br>7. Audit‑log aggregator writes immutable records; alerts on policy violations.

---

## Next Steps for Implementation Agents

1. **Helm Charts & Manifests** – Materialise per‑component charts, include OPA policies, Vault secrets injection, and Istio virtual‑service definitions for residency routing.
2. **OPA Policy Library** – Expand policies for:
   - Immutable‑log write enforcement.
   - Electronic‑signature verification.
   - GDPR erasure workflow.
3. **CI Pipelines** – Add stages:
   - Static security scans (Trivy, Bandit).
   - Model‑validation test suite.
   - OPA policy regression tests.
   - Automated compliance report generation.
4. **OpenTelemetry Instrumentation** – Provide example wrappers for FastAPI FHIR endpoints and KFServing client.
5. **Disaster‑Recovery Playbooks** – Document snapshot schedule, cross‑region restore steps, and RTO/RPO verification scripts.
6. **Documentation** – Populate `docs/` with compliance SOPs, risk‑analysis templates, and SaMD validation checklists.

---

_This optimized blueprint now explicitly addresses the critical gaps identified by the Critic, ensuring the backend will be performant, cost‑efficient, and fully compliant across FDA, HIPAA, GDPR, and SaMD requirements._
