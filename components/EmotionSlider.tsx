import { Slider } from './ui/slider';

interface EmotionSliderProps {
  value: number;
  onChange: (value: number) => void;
}

const emotions = [
  { value: 0, label: '极度恐慌', emoji: '😱' },
  { value: 25, label: '担忧', emoji: '😰' },
  { value: 50, label: '理性', emoji: '😐' },
  { value: 75, label: '乐观', emoji: '😊' },
  { value: 100, label: '极度贪婪', emoji: '🤑' }
];

export function EmotionSlider({ value, onChange }: EmotionSliderProps) {
  const currentEmotion = emotions.reduce((prev, curr) => 
    Math.abs(curr.value - value) < Math.abs(prev.value - value) ? curr : prev
  );

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground">恐慌</span>
        <div className="flex items-center gap-2">
          <span className="text-2xl">{currentEmotion.emoji}</span>
          <span>{currentEmotion.label}</span>
        </div>
        <span className="text-muted-foreground">贪婪</span>
      </div>
      <Slider
        value={[value]}
        onValueChange={(vals) => onChange(vals[0])}
        min={0}
        max={100}
        step={1}
        className="w-full"
      />
    </div>
  );
}
