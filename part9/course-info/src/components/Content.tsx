import type { ContentProps, CoursePart } from "../types";

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`,
  );
};

const Part = (props: CoursePart) => {
  const common = <b>{props.name} {props.exerciseCount}</b>
  let content;
  let background;
  let requirements;

  switch (props.kind) {
    case "basic":
      content = <i>{props.description}</i>;
      break;
    case "group":
      content = <>project exercises {props.groupProjectCount}</>;
      break;
    case "background":
      content = <i>{props.description}</i>;
      background = <>submit to {props.backgroundMaterial}</>;
      break;
    case "special":
      content = <i>{props.description}</i>;
      requirements = (
          <>
            required skills:{" "}
            {props.requirements.map((req, index) => (
              <span key={index}>
                {req}
                {index < props.requirements.length - 1 ? ", " : ""}
              </span>
            ))}
          </> )
      break;
    default:
      return assertNever(props);
  }
  return (
    <div>
      <li key={props.name+'_common'}>{common}</li>
      <li key={props.name+'_content'}>{content}</li>
      {background && <li key={props.name+'_background'}>{background}</li>}
      {requirements && <li key={props.name+'_requirements'}>{requirements}</li>}
      <br />
    </div>
  );
};

const Content = (props: ContentProps) => {
  return (
    <>
      {props.courseParts.map((part: CoursePart) => (
        <Part key={part.name} {...part} />
      ))}
    </>
  );
};

export default Content;
