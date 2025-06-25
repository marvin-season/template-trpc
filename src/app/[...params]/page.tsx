export default async function Page(props: {
  params: Promise<{ params: string[] }>
}) {
  const { params } = await props.params
  console.log(params)
  return <div>Page</div>
}
