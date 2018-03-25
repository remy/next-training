export default ({ value: selected, name = `rating` }) => {
  return selected === undefined ? null : (
    <span className="Rating">
      {Array.from({ length: 5 }).reduce((acc, curr, i) => {
        acc.push(
          <input
            type="radio"
            name={name}
            id={`${name}-${i}`}
            defaultChecked={5 - selected === i}
            key={`input-${i}`}
          />
        );
        acc.push(
          <label
            key={`label-${i}`}
            title={`${5 - i} star rating`}
            htmlFor={`${name}-${i}`}
          >
            {i}
          </label>
        );

        return acc;
      }, [])}
    </span>
  );
};
