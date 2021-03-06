import { steps } from '../utils/intro_js_steps';

export default {
  capture: {
    capture: false,
    captureText: 'Key',
    disabled: '',
    resetDisabled: 'disabled',
  },
  currentPianoNote: '',
  octave: {
    leftOctave: 3,
    rightOctave: 4,
    up: '',
    down: '',
  },
  keyStrokeEvents: [],
  exerciseScores: [],
  greenTime: {
    accumulated: 0,
    required: 1,
  },
  score: 100,
  targetNote: null,
  targetNoteIndex: 0,
  sungNote: {
    frequency: null,
    name: null,
    centDiff: null,
    arrowValue: 90 / 180,
  },
  tuningSpecs: {
    greenYellowBand: 20,
    redYellowBand: 48,
  },
  recordingStatus: false,
  singButton: {
    singText: 'Sing!',
    disabled: true,
  },
  loginSuccess: null,
  signupSuccess: null,
  currentExerciseId: null,
  graphData: null,
  dashboard: [],
  navBar: false,
  community: [],
  averageScore: 0,
  stepsEnabled: false,
  steps,
  initialStep: 0,
  introTriggered: false,
};
