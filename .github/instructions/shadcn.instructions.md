```instructions
---
applyTo: '**'
---

# Shadcn/UI MCP Server Integration Instructions

## General Rule

When a task requires building or modifying a user interface, you **MUST** use the tools available in the shadcn/ui MCP server. This ensures consistency with the design system and leverages pre-built, tested components.

## Planning Rule

When planning a UI build using shadcn/ui:

### 1. Discover Available Assets
- **Always start** by calling `list_components()` to see all available individual components
- **Always call** `list_blocks()` to see all available composite blocks and UI patterns
- Use `list_blocks(category="specific_category")` to filter blocks by category when relevant

### 2. Map Request to Assets
- Analyze the user's request carefully
- Map the required UI elements to the available components and blocks
- Consider both functional requirements and visual design needs

### 3. Prioritize Blocks Over Individual Components
- **Blocks first**: Use `get_block()` wherever possible for common, complex UI patterns such as:
  - Login/authentication pages
  - Dashboard layouts
  - Calendar interfaces
  - Product listings
  - Sidebar navigation
  - Form layouts
- **Components second**: Use individual `get_component()` for smaller, more specific needs or when blocks don't meet requirements

## Implementation Rule

When implementing the UI, follow this strict workflow:

### 1. Get Component Demo First (CRITICAL)
- **Before using any component**, you MUST call `get_component_demo(component_name)`
- This is critical for understanding:
  - How the component is used in practice
  - Required and optional props
  - Component structure and patterns
  - Integration examples

### 2. Retrieve the Source Code
- **For single components**: Call `get_component(component_name)`
- **For composite blocks**: Call `get_block(block_name, includeComponents=true)` to get the complete block with all dependencies
- **For complex blocks**: Consider calling `get_component_metadata(component_name)` to understand dependencies

### 3. Implement Correctly
- Integrate the retrieved code into the application following Clean Architecture principles
- Customize with necessary props and business logic
- Ensure proper TypeScript typing (never use `any`)
- Follow the project's multi-tenancy patterns where applicable
- Maintain accessibility standards

## Shadcn/UI Specific Guidelines

### Component Usage Patterns
```typescript
// ✅ Good: Get demo first, then implement with proper typing
const ComponentDemo = get_component_demo('button');
const ButtonComponent = get_component('button');

// Implement with proper TypeScript
interface CustomButtonProps {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  onClick: () => void
  children: React.ReactNode
}

export function CustomButton({ variant = 'default', size = 'default', onClick, children }: CustomButtonProps) {
  return (
    <Button variant={variant} size={size} onClick={onClick}>
      {children}
    </Button>
  )
}
```

## Workflow Checklist

Before implementing any UI feature:

- [ ] Call `list_components()` to see available components
- [ ] Call `list_blocks()` to see available blocks  
- [ ] Identify if any blocks match the UI pattern needed
- [ ] For each component to be used:
  - [ ] Call `get_component_demo(component_name)` first
  - [ ] Call `get_component(component_name)` or `get_block(block_name)`
  - [ ] Review the code structure and props
- [ ] Implement following Clean Architecture patterns
- [ ] Ensure TypeScript strict typing
- [ ] Test accessibility and mobile responsiveness
- [ ] Validate against Indonesian market requirements (IDR currency, mobile-first, etc.)

## Error Prevention

### Common Mistakes to Avoid:
- ❌ Using custom components instead of shadcn/ui when available
- ❌ Not calling `get_component_demo()` before implementation
- ❌ Implementing UI patterns manually when blocks exist
- ❌ Using `any` type with shadcn components
- ❌ Ignoring accessibility features built into components

### Best Practices:
- ✅ Always explore blocks before building custom layouts
- ✅ Use shadcn/ui's built-in accessibility features
- ✅ Customize styling with Tailwind classes rather than overriding component styles
- ✅ Follow shadcn/ui's composition patterns
- ✅ Maintain consistency with the design system

## Final Note

Remember: The shadcn/ui MCP server is your primary tool for UI development. Always use it before creating custom components or layouts.
```