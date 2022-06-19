export default function Card(props) {
  return (
    <article className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 br2 mr1 ml1">
      <picture>
        <img
          src={`https://avatars.dicebear.com/v2/avataaars/${props.data.id}.svg?options[mood][2]=happy`}
          className="db w-100 br2 br--top"
          alt="random image"
        />
      </picture>
      <div className="pa2 ph3-ns pb3-ns">
        <div className="dt w-100 mt1">
          <div className="dtc">
            <h1 className="f5 f4-ns mv0">{props.data.title}</h1>
          </div>
        </div>
        <br />
        <p className="truncate f6 lh-copy measure mt2 mid-gray">
          {props.data.body}
        </p>
        <br />
        <button
          className="f6 link dim ph3 pv2 mb2 dib white bg-light-purple br2 full-story-button grow pointer"
          id={props.data.id}
        >
          Full Story!
        </button>
      </div>
    </article>
  );
}
