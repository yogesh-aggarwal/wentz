export default function Icon(props: {
   name: string
   bold?: boolean
   rounded?: boolean
   size?: number
   onClick?: React.MouseEventHandler<HTMLElement>
}) {
   if (!props.name) return <></>
   return (
      <i
         onClick={props.onClick}
         // FORMAT: fi fi-(r/s)r-(name) (bold?)
         className={`fi fi-${props.rounded ? "r" : "s"}r-${props.name} ${
            props.bold ? "bold" : ""
         } ${props.name === " " ? "blank" : ""}`}
         style={props.size ? { fontSize: props.size, height: props.size } : {}}
      ></i>
   )
}
