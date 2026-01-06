## Architecture

The API follows a clean layered architecture:

- Controllers handle HTTP requests and responses
- Services apply business logic and validations
- Repositories build and execute database queries
- Middleware handles errors centrally

---

## Query Engine Features

# Cursor-Based Pagination

Pagination is implemented using cursor-based pagination instead of `skip/limit`.

- Products are sorted by `_id` in descending order
- Cursor represents the `_id` of the **last item** in the current page
- Next page fetches records where `_id < cursor`

This prevents duplicates, avoids overlaps, and scales efficiently for large datasets.

---

# Dynamic Filtering, Search & Sorting

Queries are dynamically constructed in the repository layer using request parameters:

- Text search on product name
- Price range filtering (`minPrice`, `maxPrice`)
- Tag-based filtering
- Dynamic sorting (ascending / descending)
- Pagination using `limit` and `cursor`

A single endpoint supports multiple query combinations safely.

---

# Soft Delete

Products are not permanently removed from the database.

- A `deletedAt` timestamp marks a product as deleted
- Default queries exclude deleted products
- Deleted products can be included using:

# Error Handling

The API implements structured and centralized error handling:

**Typed Errors** using a custom error class with HTTP status codes  
**Centralized Error Middleware** to handle all errors in one place

**Unified Error Response Format**:

```json
{
  "success": false,
  "message": "Error description",
  "code": 404,
  "timestamp": "ISO timestamp",
  "path": "/request/path"
}
```
