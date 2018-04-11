import React, { Component } from "react";
import "./app.css";
import { Motion, spring } from "react-motion";

class App extends Component {
  state = {
    focused: false,
    disabled: true,
    height: 38
  };
  animate = () => {
    this.setState(state => ({ height: state.height === 233 ? 38 : 233 }));
  };
  onChange = e => {
    const length = e.target.value.length;
    if (length >= 4) {
      this.setState(() => ({ disabled: false }));
    } else if (!this.state.disabled) {
      this.setState(() => ({ disabled: true }));
    }
  };
  componentDidMount() {
    this.input.addEventListener("focus", this.focus);
    this.input.addEventListener("blur", this.focus);
  }
  focus = () => {
    this.setState(state => ({ focused: !state.focused }));
  };
  render() {
    const label = this.state.disabled ? "Disabled" : "Submit";
    return (
      <div>
        <h2 style={styles.header}>CSS Animation</h2>
        <input
          ref={input => (this.input = input)}
          className={["input", this.state.focused && "input-focused"].join(" ")}
        />
        <hr />
        <h2 style={styles.header}>JS Animation</h2>
        <button
          style={Object.assign(
            {},
            styles.button,
            !this.state.disabled && styles.buttonEnabled
          )}
          disabled={this.state.disabled}
        >
          {label}
        </button>
        <br />
        <input style={styles.input} onChange={this.onChange} />
        <hr />
        <h2 style={styles.header}>React Motion</h2>
        <div style={styles.animateButton} onClick={this.animate}>
          Animate
        </div>
        <Motion style={{ height: spring(this.state.height) }}>
          {({ height }) => (
            <div style={Object.assign({}, styles.menu, { height })}>
              <p style={styles.selection}>Selection 1</p>
              <p style={styles.selection}>Selection 2</p>
              <p style={styles.selection}>Selection 3</p>
              <p style={styles.selection}>Selection 4</p>
              <p style={styles.selection}>Selection 5</p>
              <p style={styles.selection}>Selection 6</p>
            </div>
          )}
        </Motion>
      </div>
    );
  }
}

const styles = {
  header: {
    fontFamily: "Helvetica"
  },
  menu: {
    fontFamily: "Helvetica",
    overflow: "hidden",
    border: "2px solid #ddd",
    width: 300,
    marginTop: 20
  },
  selection: {
    padding: 10,
    margin: 0,
    borderBottom: "1px solid #ededed"
  },
  animateButton: {
    fontFamily: "Helvetica",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    cursor: "pointer",
    width: 200,
    height: 45,
    border: "none",
    borderRadius: 4,
    backgroundColor: "#ffc107"
  },
  input: {
    width: 200,
    outline: "none",
    fontSize: 20,
    padding: 10,
    border: "none",
    backgroundColor: "#ddd",
    marginTop: 10
  },
  button: {
    width: 180,
    height: 50,
    border: "none",
    borderRadius: 4,
    fontSize: 16,
    fontFamily: "Helvetica",
    cursor: "pointer",
    transition: ".25s all"
  },
  buttonEnabled: {
    backgroundColor: "#ffc107",
    width: 200
  }
};

export default App;
