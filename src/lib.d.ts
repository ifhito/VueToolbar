export type areaPropaties = {
  pressed: boolean | null;
  disabled: boolean | null;
};

export type tooltipType = {
  onClick: (disabled: boolean | null) => void;
  tabindex: number;
  iconName: string;
  tooltipText: string;
  areaPropaties: areaPropaties;
};

export type tooltipsGroupType = tooltipType[];
