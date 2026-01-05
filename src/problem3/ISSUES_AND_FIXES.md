# Problem 3 - Code Issues and Fixes

## Critical Errors (Code-breaking)

### 1. Undefined Variable `lhsPriority`
**Location:** Filter function inside `useMemo`
```typescript
// ❌ WRONG - Original code
const balancePriority = getPriority(balance.blockchain);
if (lhsPriority > -99) { // lhsPriority is undefined!
```

```typescript
// ✅ FIXED
const balancePriority = getPriority(balance.blockchain);
if (balancePriority > -99) {
```

---

### 2. Inverted Filter Logic
**Location:** Filter condition
```typescript
// ❌ WRONG - Keeps balances with amount <= 0
if (balancePriority > -99) {
  if (balance.amount <= 0) {
    return true; // This keeps ZERO and NEGATIVE balances!
  }
}
return false;
```

```typescript
// ✅ FIXED - Keeps balances with amount > 0
return balancePriority > -99 && balance.amount > 0;
```

---

### 3. Missing `blockchain` Property in Interface
**Location:** `WalletBalance` interface
```typescript
// ❌ WRONG - Missing blockchain property
interface WalletBalance {
  currency: string;
  amount: number;
  // blockchain property is used but not defined!
}
```

```typescript
// ✅ FIXED
interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: Blockchain; // Added with proper type
}
```

---

### 4. Mapping Wrong Array with Wrong Type
**Location:** `rows` variable
```typescript
// ❌ WRONG - Maps sortedBalances but expects FormattedWalletBalance
const rows = sortedBalances.map((balance: FormattedWalletBalance, index: number) => {
  // balance.formatted is UNDEFINED because sortedBalances doesn't have formatted property
  formattedAmount={balance.formatted}
})
```

```typescript
// ✅ FIXED - Map over formattedBalances
const rows = formattedBalances.map((balance: FormattedWalletBalance) => {
  // Now balance.formatted exists
  formattedAmount={balance.formatted}
})
```

---

## Performance Issues

### 5. Incorrect `useMemo` Dependencies
**Location:** `sortedBalances` useMemo
```typescript
// ❌ WRONG - prices is in dependencies but never used
const sortedBalances = useMemo(() => {
  return balances.filter(...).sort(...);
  // prices is not used anywhere in this computation!
}, [balances, prices]); // prices causes unnecessary re-computation
```

```typescript
// ✅ FIXED
const sortedBalances = useMemo(() => {
  return balances.filter(...).sort(...);
}, [balances]); // Only depend on what's actually used
```

---

### 6. Redundant `getPriority` Calls
**Location:** Filter and sort functions
```typescript
// ❌ WRONG - getPriority called 3 times per balance during sort
.filter((balance) => {
  const balancePriority = getPriority(balance.blockchain); // Call 1
})
.sort((lhs, rhs) => {
  const leftPriority = getPriority(lhs.blockchain);   // Call 2
  const rightPriority = getPriority(rhs.blockchain);  // Call 3
})
```

**Impact:** For 10 balances, this makes ~30+ function calls instead of 10

```typescript
// ✅ BETTER SOLUTION (Advanced optimization)
const balancesWithPriority = balances.map(balance => ({
  ...balance,
  priority: getPriority(balance.blockchain)
}));

return balancesWithPriority
  .filter(b => b.priority > -99 && b.amount > 0)
  .sort((lhs, rhs) => rhs.priority - lhs.priority);
```

---

### 7. `formattedBalances` Not Memoized
**Location:** `formattedBalances` variable
```typescript
// ❌ WRONG - Creates new array every render
const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
  return {
    ...balance,
    formatted: balance.amount.toFixed()
  }
})
```

```typescript
// ✅ FIXED - Memoized to prevent unnecessary re-creation
const formattedBalances = useMemo(() => {
  return sortedBalances.map((balance: WalletBalance): FormattedWalletBalance => ({
    ...balance,
    formatted: balance.amount.toFixed()
  }));
}, [sortedBalances]);
```

---

## React Anti-Patterns

### 8. Using Array Index as Key
**Location:** `rows` map function
```typescript
// ❌ WRONG - Using index as key
const rows = sortedBalances.map((balance, index: number) => {
  return (
    <WalletRow
      key={index} // BAD: Index changes when array is re-sorted
    />
  )
})
```

**Why it's bad:**
- When list is re-sorted, same component gets different data
- React can't track which item is which
- Component state is lost
- Poor performance

```typescript
// ✅ FIXED - Use unique stable identifier
const rows = formattedBalances.map((balance) => {
  return (
    <WalletRow
      key={balance.currency} // Stable unique key
    />
  )
})
```

---

### 9. Missing Sort Comparator Return Value
**Location:** Sort function
```typescript
// ❌ WRONG - Doesn't return 0 when equal
.sort((lhs, rhs) => {
  const leftPriority = getPriority(lhs.blockchain);
  const rightPriority = getPriority(rhs.blockchain);
  if (leftPriority > rightPriority) {
    return -1;
  } else if (rightPriority > leftPriority) {
    return 1;
  }
  // Missing return 0 when equal!
})
```

```typescript
// ✅ FIXED - Simple one-liner handles all cases
.sort((lhs, rhs) => {
  const leftPriority = getPriority(lhs.blockchain);
  const rightPriority = getPriority(rhs.blockchain);
  return rightPriority - leftPriority; // Returns -1, 0, or 1 automatically
})
```

---

## Type Safety Issues

### 10. Using `any` Type
**Location:** `getPriority` function parameter
```typescript
// ❌ WRONG - Loses type safety
const getPriority = (blockchain: any): number => {
  // Can pass anything, no autocomplete, no type checking
}
```

```typescript
// ✅ FIXED - Strong typing
type Blockchain = 'Osmosis' | 'Ethereum' | 'Arbitrum' | 'Zilliqa' | 'Neo';

const getPriority = (blockchain: Blockchain): number => {
  // TypeScript will catch typos and invalid values
}
```

---

### 11. Unused `classes` Reference
**Location:** WalletRow className prop
```typescript
// ❌ WRONG - classes is not defined
<WalletRow
  className={classes.row} // Runtime error: classes is undefined
/>
```

```typescript
// ✅ FIXED - Remove undefined reference
<WalletRow
  // className removed or define classes properly
  amount={balance.amount}
/>
```

---

### 12. Empty Interface Extension
**Location:** Props interface
```typescript
// ❌ UNNECESSARY
interface Props extends BoxProps {
  // Empty interface adds no value
}
const WalletPage: React.FC<Props> = (props: Props) => {
```

```typescript
// ✅ SIMPLIFIED
const WalletPage: React.FC<BoxProps> = (props) => {
  // Directly use BoxProps
}
```