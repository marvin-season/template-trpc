function GenericDemo<T>(
  props: {
    children: (params: Omit<T, 'children'>) => React.ReactNode
  } & Omit<T, 'children'>,
) {
  const { children, ...restProps } = props
  return <div>{children(restProps as Omit<T, 'children'>)}</div>
}

function Case() {
  return (
    <GenericDemo<{ user: { name: string; age: number } }>
      user={{ name: 'John Doe', age: 12 }}
    >
      {({ user }) => (
        <div>
          {user.name} {user.age}
        </div>
      )}
    </GenericDemo>
  )
}
