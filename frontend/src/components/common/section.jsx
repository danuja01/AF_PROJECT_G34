import { twMerge } from 'tailwind-merge'

const Section = ({ children, ...props }) => {
  return (
    <div {...props} className={twMerge('h-screen w-screen', props.className)}>
      {children}
    </div>
  )
}

export default Section
