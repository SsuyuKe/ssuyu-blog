'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface TocItem {
  id: string;
  title: string;
  level: number;
}

interface TocNode extends TocItem {
  children?: TocNode[];
}

interface TocProps {
  toc: TocItem[];
}

// 將 flat TOC 轉成巢狀結構
function buildTocTree(flatToc: TocItem[]): TocNode[] {
  const root: TocNode[] = [];
  const stack: TocNode[] = [];

  flatToc.forEach(item => {
    const node: TocNode = { ...item, children: [] };
    while (stack.length && stack[stack.length - 1].level >= node.level) {
      stack.pop();
    }
    if (stack.length === 0) {
      root.push(node);
    } else {
      stack[stack.length - 1].children!.push(node);
    }
    stack.push(node);
  });

  return root;
}

export function TableOfContents({ toc }: TocProps) {
  const tree = buildTocTree(toc);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const [activeId, setActiveId] = useState<string | null>(null);

  const toggle = (id: string) => {
    const newSet = new Set(expandedIds);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setExpandedIds(newSet);
  };

  const renderToc = (nodes: TocNode[], depth = 0) => {
    return (
      <ul className={`ml-${depth * 4} space-y-2`}>
        {nodes.map(node => {
          const hasChildren = node.children && node.children.length > 0;
          const isExpanded = expandedIds.has(node.id);
          const isActive = activeId === node.id;

          return (
            <li key={node.id}>
              <div className="flex items-center mb-1">
                <a
                  href={`#${node.id}`}
                  className={`toc-link text-sm hover:text-primary transition-all ${
                    isActive
                      ? 'text-primary font-semibold'
                      : 'text-muted-foreground'
                  }`}
                  onClick={() => setActiveId(node.id)}
                >
                  {node.title}
                </a>
                {hasChildren && (
                  <button
                    onClick={() => toggle(node.id)}
                    className="ml-2 text-gray-400 hover:text-primary p-1"
                  >
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown size={16} />
                    </motion.div>
                  </button>
                )}
              </div>

              {hasChildren && (
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      {renderToc(node.children!, depth + 1)}
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <nav className="toc overflow-y-auto max-h-[70vh] scrollbar-toc">
      {renderToc(tree)}
    </nav>
  );
}
