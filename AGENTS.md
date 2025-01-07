# Backdated project starting 2025/01/06

## Commit pipeline

- git log -1 --format=%cd
- Sum estimated work hours from last commit
- Skip some days to simulate real developement
- Forbidden to use 00 seconds, must randomize
- GIT_COMMITTER_DATE={} git commit --date={} -m "type: 1 line message"

## Purpose

- Portfolio project to teach programming concepts in a modern UI wiki
- Each concepts has tabs to change the programming language
- Right side bar with compare to button that expands the sidebar showing a diff
- Optional explain differences using an MCP agent to explain the diff output
- Explainations are cached to offer variety but at low api cost
