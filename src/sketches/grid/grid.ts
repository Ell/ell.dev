import * as Tone from 'tone';

const width = 512;
const height = 640;

const scale = ['C3', 'E3', 'F3', 'G3', 'B3', 'C4', 'E4', 'F4'];

const state = {
  cells: [
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false],
  ],
  playing: false,
  activeColumn: 1,
  volume: 0.2,
  bpm: 120,
};

const canvas = document.getElementById('grid-canvas') as unknown as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;

canvas.width = width;
canvas.height = height;

const transport = Tone.getTransport();

transport.bpm.value = state.bpm;
transport.scheduleRepeat((time) => {
  tick(time);
}, '4n');

transport.start();

const gain = new Tone.Gain().toDestination();
gain.gain.value = state.volume;

const reverb = new Tone.Reverb().connect(gain);
reverb.decay = 50;

const synth = new Tone.PolySynth(Tone.AMSynth).connect(reverb);
synth.maxPolyphony = 8;

canvas.addEventListener('click', async (e) => {
  const rect = canvas.getBoundingClientRect();

  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const cellX = Math.floor(x / 64);
  const cellY = Math.floor((y - 64) / 64);

  state.cells[cellY][cellX] = !state.cells[cellY][cellX];

  if (!state.playing) {
    await startAudio();
  }
});

async function startAudio() {
  try {
    await Tone.start();
  } catch (e) {
    console.error(e);

    state.playing = false;

    return;
  }

  state.playing = true;
}

function tick(time: number) {
  state.activeColumn = (state.activeColumn + 1) % 8;
  triggerColumn(state.activeColumn);
}

function triggerColumn(column: number) {
  const notes = state.cells
    .map((row) => row[column])
    .map((active, i) => {
      if (active) {
        return scale[i];
      }
    })
    .filter((note) => note !== undefined);

  synth.triggerAttackRelease(notes, '8n');
}

function renderCell(x: number, y: number, active: boolean) {
  ctx.strokeStyle = '#eee';
  ctx.fillStyle = active ? '#eee' : 'black';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.roundRect(x * 64 + 10, y * 64 + 10 + 64, 50, 50, 12);
  ctx.stroke();

  ctx.fill();

  active && ctx.fill();
}

function renderIndicators() {
  for (let i = 0; i < 8; i++) {
    ctx.strokeStyle = '#eee';
    ctx.fillStyle = state.activeColumn === i ? '#eee' : 'black';
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.roundRect(i * 64 + 26, 32, 16, 16, 32);

    ctx.stroke();

    ctx.fill();
  }
}

function renderGrid() {
  for (let y = 0; y < state.cells.length; y++) {
    for (let x = 0; x < state.cells[y].length; x++) {
      renderCell(x, y, state.cells[y][x]);
    }
  }

  renderIndicators();
}

export function start() {
  requestAnimationFrame(function loop() {
    renderGrid();
    requestAnimationFrame(loop);
  });
}
