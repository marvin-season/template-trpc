// app/[tenant]/page.tsx
export default function TenantHome({ params }: { params: { tenant: string } }) {
  return <h1>Hello from tenant: {params.tenant}</h1>
}
