# Google Search Console baseline - 2026-09-22

## Scope

- Property: `https://macrosaver.com/`
- Search type: Web
- Window: 3 months, July 7 through September 20, 2026
- Source: Google Search Console Performance report, captured September 22, 2026
- Page reviewed: `https://macrosaver.com/best/best-protein-powder-under-50`

## Page baseline

| Clicks | Impressions | CTR | Average position |
| ---: | ---: | ---: | ---: |
| 0 | 621 | 0% | 8.1 |

## Query-to-page mapping

Every query below mapped to the same existing page: `/best/best-protein-powder-under-50`.

| Query | Clicks | Impressions | CTR | Average position |
| --- | ---: | ---: | ---: | ---: |
| best lightweight protein powder under 50 | 0 | 110 | 0% | 8.2 |
| best portable protein powder under 50 | 0 | 74 | 0% | 8.4 |
| best easy protein powder under 50 | 0 | 71 | 0% | 7.6 |
| best simple protein powder under 50 | 0 | 67 | 0% | 8.6 |
| best compact protein powder under 50 | 0 | 60 | 0% | 5.0 |
| best premium protein powder under 50 | 0 | 52 | 0% | 6.9 |
| best quick protein powder under 50 | 0 | 47 | 0% | 6.6 |
| best quiet protein powder under 50 | 0 | 36 | 0% | 7.2 |
| **Adjective cluster total** | **0** | **517** | **0%** | **7.5 weighted** |

The cluster represents 83.3% of the page's impressions. Search Console does not explain why these unusual adjective permutations appeared, so they should be monitored as an anomaly rather than treated as eight proven content intents.

## Relevant control queries

| Query | Clicks | Impressions | CTR | Average position |
| --- | ---: | ---: | ---: | ---: |
| best protein powder under $50 | 0 | 4 | 0% | 22.0 |
| protein powder under $50 | 0 | 1 | 0% | 14.0 |
| best cheap protein powder under 50 | 0 | 12 | 0% | 6.5 |
| best budget protein powder under 50 | 0 | 9 | 0% | 6.2 |

## Decision and implementation

1. Do not create one page per adjective. The existing page already owns all eight query variants.
2. Do not publish `best-lightweight-protein-powder-under-50`. It duplicates the existing small-serving-sizes ranking and would compete with the established under-$50 URL.
3. Strengthen the existing page with a clearer search description, explicit methodology, a decision guide, and page-specific FAQs.
4. Keep the existing title and canonical URL. The data does not justify inserting the anomalous adjective variants into the title.
5. Preserve `/best/best-protein-powder-small-serving-sizes` as the distinct destination for scoop-size intent.

## Measurement plan

Record equal 28-day periods after deployment. Do not interpret a one- or two-click change as a stable trend at this volume.

| Review | Window | Clicks | Impressions | CTR | Avg. position | Notes |
| --- | --- | ---: | ---: | ---: | ---: | --- |
| Baseline | 2026-07-07 to 2026-09-20 (3 months) | 0 | 621 | 0% | 8.1 | Pre-change GSC baseline |
| First review | First complete 28 days after deployment |  |  |  |  | Compare page plus query cluster |
| Second review | Following 28 days |  |  |  |  | Keep, revise, or roll back based on trend |

### Success signals

- Relevant queries gain impressions without spawning a competing URL.
- Clicks increase for the page, especially on natural price/value queries.
- CTR improves at comparable positions.
- The adjective cluster either produces clicks or declines as Google refines matching.
- The exact query `best protein powder under $50` moves closer to the first results page.

### Change log

| Date | Change | Expected effect |
| --- | --- | --- |
| 2026-09-22 | Consolidated the unpushed lightweight-page work into the established under-$50 page; added methodology, decision guidance, FAQs, and a more concrete meta description. | Avoid cannibalization and improve usefulness/snippet alignment on the existing ranking. |
