import Control from './control'

export default function () {
  return (
    <>
      <div
        className={`
          absolute bottom-4 left-40 z-[9] mt-1 flex items-center gap-2
        `}
      >
        <Control />
      </div>
    </>
  )
}
