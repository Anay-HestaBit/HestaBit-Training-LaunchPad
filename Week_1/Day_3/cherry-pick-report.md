# Cherry-pick Report

**Source Branch:** main  
**Target Branch:** release/v0.1  

## Cherry-picked Commits
- 9b0e571 – feat: added multiplication function
- e867c51 – feat: fixed the bug (empty patch, already applied on release branch)

### Notes
- One merge conflict occurred in App.js during cherry-pick
- Conflict resolved manually by fixing the subtract function
- The second commit contained no applicable changes → skipped using `git cherry-pick --skip`
- Cherry-pick completed successfully on release/v0.1 branch
