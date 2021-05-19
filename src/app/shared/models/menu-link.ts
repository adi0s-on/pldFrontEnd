export class MenuLink {

  constructor(
    _title?: string, 
    _url?: string,
    _iconName?: string
  ) {
    this.title = _title;
    this.url = _url;
    this.iconName = _iconName;
  }

  title: string;
  url: string;
  iconName: string;
}
