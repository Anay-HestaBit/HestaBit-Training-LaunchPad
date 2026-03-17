# DAY 2 — MULTI-AGENT ORCHESTRATION

## Planner → Workers → Reflection → Validator

---

## What We Built

A multi-agent pipeline where a Planner breaks the query into tasks, Workers execute
them in parallel via a DAG, Reflection merges results, and Validator does a final check.

---

## Execution Flow

```
User Query
    ↓
Planner             → breaks query into tasks (max 4)
    ↓
worker_1 | worker_2 | worker_3 | worker_4    → run in parallel via DAG
    ↓
Reflection Agent    → merges all worker outputs
    ↓
Validator Agent     → checks correctness, returns {is_valid, issues}
    ↓
Final Answer
```

---

## What Each Agent Does

**Planner** — receives query, returns structured JSON plan via Pydantic. Max 4 tasks.

**Workers** — one per task, named worker_1, worker_2 etc. Each only knows its own task.

**Reflection** — fan-in node in DAG, merges all worker outputs into one clean response.

**Validator** — last node, returns structured JSON `{is_valid, issues}` via Pydantic.

---

## Key Concepts

**DAG execution** — built using AutoGen's `DiGraphBuilder`. Workers are parallel nodes,
edges define who passes to whom, results converge at Reflection Agent.

**Pydantic models** — planner and validator outputs are validated. Wrong format = immediate error.

**Dynamic workers** — number of workers depends on planner output, not hardcoded.

---

## What Changed vs Day 1

Day 1 was linear and sequential. Day 2 uses a DAG with parallel workers,
structured outputs, and a proper validation gate.
