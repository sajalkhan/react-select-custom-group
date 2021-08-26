type SelectProps = {
  label: string;
  options: {
    label: string;
    value: string;
    menu?: boolean;
  }[];
};

export const position = [
  { value: '店舗システム利用全社', label: '店舗システム利用全社', menu: true },
  { value: 'ADaMS利用会社', label: 'ADaMS利用会社', menu: true },
  { value: 'ネットスーパー(アイビス)', label: 'ネットスーパー(アイビス)', menu: true },
  { value: 'MDBO/GMS環境(20120619更新)-1', label: 'MDBO/GMS環境(20120619更新)-1', menu: true },
  { value: 'MDBO/SM環境(20120619更新)', label: 'MDBO/SM環境(20120619更新)', menu: true },
  { value: 'MDBO/SuC環境(20120619更新)', label: 'MDBO/SuC環境(20120619更新)', menu: true },
];

export const socity = [
  { value: 'イオンアイビス', label: 'イオンアイビス' },
  { value: '会社名が入ります-1', label: '会社名が入ります-1' },
  { value: '会社名が入ります-2', label: '会社名が入ります-2' },
  { value: '会社名が入ります-3', label: '会社名が入ります-3' },
  { value: '会社名が入ります-4', label: '会社名が入ります-4' },
  { value: '会社名が入ります-5', label: '会社名が入ります-5' },
  { value: '会社名が入ります-6', label: '会社名が入ります-6' },
];

export const groupedOptions: SelectProps[] = [
  {
    label: '投稿先グループ',
    options: position,
  },
  {
    label: '会社',
    options: socity,
  },
];
