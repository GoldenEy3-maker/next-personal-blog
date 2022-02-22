export const setDynamicClasses = (
  defaultClass: string,
  dynamicClass: string,
  condition: boolean
) => {
  const classes = [defaultClass]

  if (condition) classes.push(dynamicClass)

  return classes.join(' ')
}

export const setStaticClasses = (classes: string[]) => classes.join(' ')
