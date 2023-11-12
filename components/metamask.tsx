'use client'

export type MetaMaskProps = {
  address?: string,
  tokens: number,
  tryToConnect: Function
}

export default (props: MetaMaskProps) => {

  const handleOnClick = () => {
    if(typeof props.address === "undefined")
      props.tryToConnect();
  }

  return (
    <div className="input-group flex-nowrap text-end">
      <button type="button" className="btn btn-warning" onClick={handleOnClick}>
        {props.address || "Connect Metamask"}
      </button>
    </div>
  )
}