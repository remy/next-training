function explode() {
  throw new Error('explode!');
}

export default () => <p>Explode! {explode()}</p>;
