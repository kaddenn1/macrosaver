## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

Rules:
- For codebase questions, first run `graphify query "<question>"` when graphify-out/graph.json exists. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).

## Active collaboration plan

The current priority is the Amazon Associates remediation and MacroSaver value-analysis
repositioning. Before changing pricing, offer, catalog, product-page, comparison, deal,
affiliate-link, disclosure, or product-image code, read and follow:

- `scratch/macrosaver-photo-and-compliance-2026-09-29/macrosaver-amazon-associates-collaboration-plan.md`

The working tree may contain edits from another collaborator. Inspect `git status` and
`git diff` first, preserve overlapping work, and do not reset, discard, stage, or commit
changes unless the user explicitly asks.
