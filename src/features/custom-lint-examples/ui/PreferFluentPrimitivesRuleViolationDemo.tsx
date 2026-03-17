// interface PreferFluentPrimitivesRuleViolationDemoProps {
//   title: string
//   details: string
//   priority: string
//   onTitleChange: (value: string) => void
//   onDetailsChange: (value: string) => void
//   onPriorityChange: (value: string) => void
//   onSave: () => void
// }

// // Intentionally uses native controls to demonstrate react-best-practices/prefer-fluent-primitives.
// export function PreferFluentPrimitivesRuleViolationDemo({
//   title,
//   details,
//   priority,
//   onTitleChange,
//   onDetailsChange,
//   onPriorityChange,
//   onSave,
// }: PreferFluentPrimitivesRuleViolationDemoProps) {
//   return (
//     <section aria-label="Native controls demo for lint rule">
//       <h2>Create Work Item (Violation Example)</h2>
//       <p>
//         This file intentionally uses native controls so the custom lint rule can show developers
//         exactly what should be replaced with Fluent primitives.
//       </p>

//       <label htmlFor="native-title">Title</label>
//       <input
//         id="native-title"
//         value={title}
//         onChange={(event) => {
//           onTitleChange(event.target.value)
//         }}
//       />

//       <label htmlFor="native-details">Details</label>
//       <textarea
//         id="native-details"
//         value={details}
//         onChange={(event) => {
//           onDetailsChange(event.target.value)
//         }}
//       />

//       <label htmlFor="native-priority">Priority</label>
//       <select
//         id="native-priority"
//         value={priority}
//         onChange={(event) => {
//           onPriorityChange(event.target.value)
//         }}
//       >
//         <option value="low">Low</option>
//         <option value="medium">Medium</option>
//         <option value="high">High</option>
//       </select>

//       <button type="button" onClick={onSave}>
//         Save item
//       </button>
//     </section>
//   )
// }
