"use client";

import { useEffect, useRef, useState } from "react";
import { formatNumber, tweenText } from "@/lib/motion";

const HOURS = 8760;

type SliderProps = {
  id: string;
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  display: string;
  onChange: (v: number) => void;
};

function Slider({ id, label, min, max, step, value, display, onChange }: SliderProps) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="sld-label">
        <label htmlFor={id}>{label}</label>
        <span className="sld-val">{display}</span>
      </div>
      <input
        type="range"
        id={id}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        style={{ "--fill": `${pct.toFixed(1)}%` } as React.CSSProperties}
      />
    </div>
  );
}

/** Output value that tweens from its previous number to the new one. */
function TweenValue({ value, id }: { value: number; id: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const prev = useRef(value);
  useEffect(() => {
    const el = ref.current;
    if (!el || prev.current === value) return;
    const cancel = tweenText(el, prev.current, value, { prefix: "$", duration: 600 });
    prev.current = value;
    return cancel;
  }, [value]);
  return (
    <span className="v" id={id} ref={ref}>
      {formatNumber(value, "$")}
    </span>
  );
}

export default function Calculator() {
  const [gpus, setGpus] = useState(32);
  const [rate, setRate] = useState(10);
  const [util, setUtil] = useState(85);
  const [target, setTarget] = useState(5);

  const current = Math.round(gpus * HOURS * (util / 100) * rate);
  const committed = Math.round(gpus * HOURS * target);
  const diff = current - committed;

  return (
    <div className="calc-panel reveal" data-d="1">
      <div className="calc-inputs">
        <Slider id="s-gpus" label="GPUs" min={1} max={1000} step={1} value={gpus} display={String(gpus)} onChange={setGpus} />
        <Slider id="s-rate" label="Current rate / GPU-hour" min={1} max={25} step={0.25} value={rate} display={`$${rate.toFixed(2)}`} onChange={setRate} />
        <Slider id="s-util" label="Utilization" min={10} max={100} step={1} value={util} display={`${Math.round(util)}%`} onChange={setUtil} />
        <Slider id="s-target" label="Committed rate* / GPU-hour" min={3} max={8} step={0.25} value={target} display={`$${target.toFixed(2)}`} onChange={setTarget} />
      </div>
      <div>
        <div className="calc-out" aria-live="polite">
          <div className="out-row">
            <span className="k">On-demand spend at utilization</span>
            <TweenValue id="o-current" value={current} />
          </div>
          <div className="out-row">
            <span className="k">Committed cost at 100% reserved hours</span>
            <TweenValue id="o-ice" value={committed} />
          </div>
          <div className="out-row save">
            <span className="k">Difference vs. on-demand</span>
            <TweenValue id="o-diff" value={diff} />
          </div>
        </div>
        <p className="out-note" style={{ marginTop: "14px" }}>
          Model: on-demand cost = GPUs × 8,760 × utilization × current rate. Commitment cost = GPUs × 8,760 ×
          committed rate (all reserved hours billed). The public page does not confirm actual utilization billing;
          confirm invoicing and included services in a written quote.
        </p>
        <div className="calc-cta">
          <a href="#quote" className="btn btn-primary" id="calc-cta">
            Check capacity &amp; pricing <span className="arr">→</span>
          </a>
        </div>
      </div>
    </div>
  );
}
