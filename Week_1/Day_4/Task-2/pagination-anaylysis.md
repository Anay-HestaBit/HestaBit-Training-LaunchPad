# Pagination Analysis – GitHub Repos API

## Endpoint Tested

GET https://api.github.com/users/octocat/repos?page=1&per_page=5

## Why Pagination Exists

GitHub limits the number of results returned in one request to improve performance and reduce bandwidth. Instead of sending all repositories at once, the client can request a specific page and number of items using `page` and `per_page` query parameters.

- `page` → which page to fetch (starting at 1)
- `per_page` → number of repos per response

## Link Header from Page 1

Example captured:
https://api.github.com/user/583231/repos?page=2&per_page=5; rel="next",
https://api.github.com/user/583231/repos?page=2&per_page=5; rel="last"

### What the `rel` attributes mean

| rel value| Meaning |
| `next` | URL of the next page of results |
| `last` | URL of the final page |
| `prev` | Would indicate the previous page (not present on page 1) |
| `first` | Would indicate the first page (not required because we’re already on page 1) |

## Navigating Pages

1. Request Page 1 → saw a `rel="next"` link → followed that URL
2. Request Page 2 → **did not** contain `rel="next"` → this is the last page

## Final Page Count

There are only **2 pages** of results for this user when requesting 5 repos per page.

---

### Conclusion

GitHub uses the `Link` response header to help clients navigate paginated data without guessing how many pages exist. The absence of `rel="next"` tells us we reached the end of pagination.
