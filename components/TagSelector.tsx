import { useState } from 'react';

interface TagGroup {
  category: string;
  tags: string[];
}

interface TagSelectorProps {
  type: 'buy' | 'sell';
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
}

const buyTagGroups: TagGroup[] = [
  {
    category: '技术面',
    tags: ['突破关键阻力', '金叉信号', '超跌反弹', '成交量放大', '形态突破']
  },
  {
    category: '基本面',
    tags: ['财报超预期', '行业景气上升', '估值合理', '业绩增长', '新产品发布']
  },
  {
    category: '消息面',
    tags: ['政策利好', '行业利好', '机构看好', '重组并购', '股东增持']
  },
  {
    category: '情绪面',
    tags: ['市场情绪好', '板块轮动', '热点概念', '跟风操作', 'FOMO心态']
  }
];

const sellTagGroups: TagGroup[] = [
  {
    category: '技术面',
    tags: ['跌破支撑', '死叉信号', '高位滞涨', '量价背离', '形态破位']
  },
  {
    category: '基本面',
    tags: ['财报不及预期', '行业景气下降', '估值过高', '业绩下滑', '负面新闻']
  },
  {
    category: '策略执行',
    tags: ['达到止盈目标', '触及止损线', '仓位调整', '换股操作', '资金需求']
  },
  {
    category: '情绪面',
    tags: ['恐慌性卖出', '获利了结', '市场转弱', '担心回撤', '冲动决策']
  }
];

export function TagSelector({ type, selectedTags, onTagsChange }: TagSelectorProps) {
  const tagGroups = type === 'buy' ? buyTagGroups : sellTagGroups;

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      onTagsChange(selectedTags.filter(t => t !== tag));
    } else {
      onTagsChange([...selectedTags, tag]);
    }
  };

  return (
    <div className="space-y-4">
      {tagGroups.map((group, idx) => (
        <div key={idx}>
          <div className="text-muted-foreground mb-2">{group.category}</div>
          <div className="flex flex-wrap gap-2">
            {group.tags.map((tag, tagIdx) => {
              const isSelected = selectedTags.includes(tag);
              return (
                <button
                  key={tagIdx}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1.5 rounded-full border transition-colors ${
                    isSelected
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-card border-border hover:border-primary'
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
