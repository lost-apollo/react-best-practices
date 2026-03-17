// interface RenderBranchRuleViolationDemoProps {
//   hasItems: boolean
//   isLoading: boolean
// }

// export function RenderBranchRuleViolationDemo({ hasItems, isLoading }: RenderBranchRuleViolationDemoProps) {
//   return !isLoading && hasItems ? (
//     <section aria-label="Loaded items" className="lint-demo-container">
//       <header>
//         <h2>Loaded Items Dashboard</h2>
//         <p>Data has loaded, but this branch is intentionally oversized for readability demos.</p>
//       </header>

//       <div>
//         <article>
//           <h3>Summary</h3>
//           <p>43 items synced</p>
//           <p>7 items flagged</p>
//           <p>12 items updated in last hour</p>
//         </article>

//         <article>
//           <h3>Highlights</h3>
//           <ul>
//             <li>Owner coverage has improved by 18% this week.</li>
//             <li>Priority issues are concentrated in 2 categories.</li>
//             <li>Backlog is trending down for the third sprint in a row.</li>
//             <li>Automation checks completed with no regressions.</li>
//           </ul>
//         </article>
//       </div>

//       <div>
//         <section>
//           <h3>Recent Activity</h3>
//           <ul>
//             <li>Item-2042 moved to In Progress by Alex.</li>
//             <li>Item-2067 moved to Review by Priya.</li>
//             <li>Item-2075 moved to Done by Jamal.</li>
//             <li>Item-2079 reassigned to Platform Team.</li>
//             <li>Item-2083 marked blocked by dependency outage.</li>
//           </ul>
//         </section>

//         <section>
//           <h3>Quick Stats</h3>
//           <dl>
//             <dt>Throughput</dt>
//             <dd>31/week</dd>
//             <dt>Lead Time</dt>
//             <dd>3.4 days</dd>
//             <dt>Escaped Defects</dt>
//             <dd>1 this month</dd>
//             <dt>Reopened Work</dt>
//             <dd>4 this sprint</dd>
//           </dl>
//         </section>
//       </div>

//       <footer>
//         <p>
//           This giant block is intentionally hard to scan. The lint rule encourages extracting each
//           section into named render branches/components.
//         </p>
//       </footer>
//     </section>
//   ) : (
//     <section aria-label="Fallback state" className="lint-demo-container">
//       <header>
//         <h2>Fallback Experience</h2>
//         <p>No data is currently available, and this branch is intentionally verbose for demo value.</p>
//       </header>

//       <div>
//         <section>
//           <h3>Possible Causes</h3>
//           <ul>
//             <li>Network request timed out before response was returned.</li>
//             <li>User selected a date range with no matching records.</li>
//             <li>Service dependency is degraded in the current region.</li>
//             <li>Permissions changed and filtered all visible items.</li>
//           </ul>
//         </section>

//         <section>
//           <h3>Suggested Next Steps</h3>
//           <ol>
//             <li>Retry loading after a short delay.</li>
//             <li>Clear any active filters and search again.</li>
//             <li>Check service health status for outages.</li>
//             <li>Confirm account permissions with admin.</li>
//           </ol>
//         </section>
//       </div>

//       <div>
//         <article>
//           <h3>Support Notes</h3>
//           <p>When this branch appears frequently, capture console logs and request IDs.</p>
//           <p>Attach browser version, environment, and timestamp for faster triage.</p>
//           <p>Track repeated failures by region to detect infrastructure incidents.</p>
//         </article>

//         <aside>
//           <h3>Message to Demo Audience</h3>
//           <p>
//             This large fallback block is intentionally awkward to maintain. Splitting it into small,
//             explicit render branches makes intent easier to read and review.
//           </p>
//         </aside>
//       </div>
//     </section>
//   )
// }
