import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect as reactConnect } from 'react-redux';
import { pushKeyEventToArray, currentNote } from '../../actions';
// import { octaveReducer } from '../../reducers';
import getFrequencyAndKeyNum from '../../audio/frequencies';
// import getDistortionCurve from '../../audio/distort';

const AudioContext = window.AudioContext || window.webkitAudioContext;
const ctx = new AudioContext();
const osc = ctx.createOscillator();
const gainNode = ctx.createGain();
// const distortion = ctx.createWaveShaper();


// osc.connect(gainNode);
// osc.connect(distortion);
// gainNode.connect(ctx.destination);
// distortion.connect(ctx.destination);
// osc.connect(ctx.destination);

// gainNode.connect(ctx.destination);
// osc.connect(ctx.destination);
// osc.connect(gainNode);
// osc.type = 'sine';
// osc.frequency.value = 0;
// gainNode.gain.value = 0;
// distortion.curve = makeDistortionCurve(666);
// distortion.oversample = '4x';
// osc.start();


osc.connect(gainNode);
gainNode.connect(ctx.destination);
osc.type = 'square';
osc.connect(ctx.destination);
osc.frequency.value = 0;
gainNode.gain.value = 0;
osc.start();

const mapStateToProps = (state) => {
  return {
    octave: state.octaveReducer.current,
    capture: state.captureReducer.capture,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ pushKeyEventToArray, currentNote }, dispatch);
};

const styleClicked = { backgroundColor: '#2f8aaf' };

class Piano extends Component {
  constructor(props) {
    super(props);
    this.state = { ...this.state, style: null };
  }

  handleClick = (note) => {
    this.props.currentNote(note);

    this.setState({
      ...this.state, style: styleClicked,
    });

    const freqAndKeyNum = getFrequencyAndKeyNum(note, this.props.octave);
    const keyNum = freqAndKeyNum.keyNum;
    const tNote = freqAndKeyNum.tNote;

    let noteObj = {
      noteName: note,
      octave: this.props.octave,
      keyNum,
      tNote,
    };

    // console.log(noteObj);

    if (this.props.capture) { this.props.pushKeyEventToArray(noteObj); }

    osc.frequency.value = freqAndKeyNum.frequency;
    gainNode.gain.value = 0.2;

    setTimeout(() => {
      gainNode.gain.value = 0;
      osc.frequency.value = 0;
    }, 700);

  }

  render() {
    return (
      <div className="col-lg-7 col-md-6 col-sm-9 col-xs-12">
        <div onClick={() => this.handleClick('C')} className="white-key"  ></div>
        <div onClick={() => this.handleClick('C# / Db')} className="black-key" ></div>
        <div onClick={() => this.handleClick('D')} className="white-key" ></div>
        <div onClick={() => this.handleClick('D# / Eb')} className="black-key" ></div>
        <div onClick={() => this.handleClick('E')} className="white-key" ></div>
        <div onClick={() => this.handleClick('F')} className="white-key" ></div>
        <div onClick={() => this.handleClick('F# / Gb')} className="black-key" ></div>
        <div onClick={() => this.handleClick('G')} className="white-key" ></div>
        <div onClick={() => this.handleClick('G# / Ab')} className="black-key" ></div>
        <div onClick={() => this.handleClick('A')} className="white-key" ></div>
        <div onClick={() => this.handleClick('A# / Bb')} className="black-key" ></div>
        <div onClick={() => this.handleClick('B')} className="white-key" ></div>
      </div>
    );
  }

}

export default reactConnect(mapStateToProps, mapDispatchToProps)(Piano);
