import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { TagSelector } from './TagSelector';
import { EmotionSlider } from './EmotionSlider';
import { Camera, Mic, X } from 'lucide-react';

interface AddTransactionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (transaction: any) => void;
}

export function AddTransactionModal({ open, onOpenChange, onSave }: AddTransactionModalProps) {
  const [type, setType] = useState<'buy' | 'sell'>('buy');
  const [stockCode, setStockCode] = useState('');
  const [stockName, setStockName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [notes, setNotes] = useState('');
  const [emotion, setEmotion] = useState(50);
  const [targetPrice, setTargetPrice] = useState('');
  const [stopLoss, setStopLoss] = useState('');

  const handleSave = () => {
    const transaction = {
      id: Date.now().toString(),
      type,
      stockCode,
      stockName,
      price: parseFloat(price),
      quantity: parseInt(quantity),
      tags: selectedTags,
      notes,
      emotion,
      targetPrice: targetPrice ? parseFloat(targetPrice) : undefined,
      stopLoss: stopLoss ? parseFloat(stopLoss) : undefined,
      date: new Date().toISOString()
    };
    
    onSave(transaction);
    resetForm();
    onOpenChange(false);
  };

  const resetForm = () => {
    setType('buy');
    setStockCode('');
    setStockName('');
    setPrice('');
    setQuantity('');
    setSelectedTags([]);
    setNotes('');
    setEmotion(50);
    setTargetPrice('');
    setStopLoss('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>记录一笔交易</DialogTitle>
          <DialogDescription>
            记录交易信息和决策依据，帮助你进行投资复盘
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Buy/Sell Toggle */}
          <div className="flex gap-2 p-1 bg-muted rounded-lg">
            <button
              type="button"
              onClick={() => setType('buy')}
              className={`flex-1 py-2 rounded-md transition-colors ${
                type === 'buy'
                  ? 'bg-[#FF3B30] text-white'
                  : 'text-foreground hover:bg-background'
              }`}
            >
              买入
            </button>
            <button
              type="button"
              onClick={() => setType('sell')}
              className={`flex-1 py-2 rounded-md transition-colors ${
                type === 'sell'
                  ? 'bg-[#34C759] text-white'
                  : 'text-foreground hover:bg-background'
              }`}
            >
              卖出
            </button>
          </div>

          {/* Stock Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>股票代码</Label>
              <Input
                placeholder="如: 600519"
                value={stockCode}
                onChange={(e) => setStockCode(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label>股票名称</Label>
              <Input
                placeholder="如: 贵州茅台"
                value={stockName}
                onChange={(e) => setStockName(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>

          {/* Price and Quantity */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>价格 (¥)</Label>
              <Input
                type="number"
                step="0.01"
                placeholder="0.00"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label>数量 (股)</Label>
              <Input
                type="number"
                placeholder="100"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>

          {/* Strategy Settings (for buy) */}
          {type === 'buy' && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>目标止盈价 (可选)</Label>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={targetPrice}
                  onChange={(e) => setTargetPrice(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label>止损价 (可选)</Label>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={stopLoss}
                  onChange={(e) => setStopLoss(e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
          )}

          {/* Decision Tags */}
          <div>
            <Label className="mb-3 block">决策依据</Label>
            <TagSelector
              type={type}
              selectedTags={selectedTags}
              onTagsChange={setSelectedTags}
            />
          </div>

          {/* Detailed Notes */}
          <div>
            <Label>详细记录</Label>
            <Textarea
              placeholder="记录你的分析思路、关键指标、市场环境等..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="mt-1 min-h-[100px]"
            />
            <div className="flex gap-2 mt-2">
              <Button type="button" variant="outline" size="sm">
                <Mic className="w-4 h-4 mr-1" />
                语音输入
              </Button>
              <Button type="button" variant="outline" size="sm">
                <Camera className="w-4 h-4 mr-1" />
                上传图片
              </Button>
            </div>
          </div>

          {/* Emotion */}
          <div>
            <Label className="mb-3 block">情绪标记</Label>
            <EmotionSlider value={emotion} onChange={setEmotion} />
          </div>

          {/* Save Button */}
          <Button
            onClick={handleSave}
            className="w-full"
            disabled={!stockCode || !stockName || !price || !quantity}
          >
            保存记录
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
