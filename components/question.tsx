import Timer from "./timer"


type QuestionOption = {
  text: string
}
type QuestionProps = {
  id: number,
  image: string,
  text: string,
  options: Array<QuestionOption>,
  timeLeft: number,
  onSelectOption: Function
}

export default (props: QuestionProps) => {

  return (
    <div
      className="container mt-5"
      style={{ maxWidth: "500px", backgroundColor: "#fff", border: "1px solid #dee2e6", borderRadius: "8px", padding: "20px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}
    >
      <div className="row border-bottom my-3">
        <div className="col-4">
          <img
            src={props.image}  // Ruta relativa desde la carpeta "public"
            alt="Descripción de la imagen"
            width={100}  // Ancho deseado
            height={70} // Altura deseada
          />
        </div>
        <div className="col-8">
          <div>
            <h2>Question:</h2>
            <p>{props.text}</p>
          </div>
        </div>
      </div>
      <div className="row">
        <div className='col-12'>
          <form>
            {
              props.options.map((o: QuestionOption, index: number) => {
                return (
                  <div className="form-check" style={{ paddingLeft: "0" }} key={`option-${index}`}>
                    <button
                      type="button"
                      className="btn btn-outline-secondary mb-2 w-100"
                      onClick={(ev) => { ev.preventDefault(); props.onSelectOption(props.id, index)}}
                    >
                      {o.text}
                    </button>
                  </div>
                )
              })
            }
          </form>
        </div>
      </div>
      <div className="row">
        <div className='col-12 d-flex justify-content-end'>
          <Timer seconds={props.timeLeft} onFinishTime={() => props.onSelectOption(props.id, null)} />
        </div>
      </div>
    </div>
  )
}