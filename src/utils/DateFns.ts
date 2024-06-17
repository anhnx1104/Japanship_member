import { DateFormat } from 'constant/locale';
import compareDesc from 'date-fns/compareDesc';
import endOfDay from 'date-fns/endOfDay';
import _format from 'date-fns/format';
import getDate from 'date-fns/getDate';
import getMonth from 'date-fns/getMonth';
import getYear from 'date-fns/getYear';
import isFuture from 'date-fns/isFuture';
import _isValid from 'date-fns/isValid';
import parse from 'date-fns/parse';
import startOfDay from 'date-fns/startOfDay';

class DateFns {
  private Ensure(value: Date): Date;
  private Ensure(value?: any) {
    if (!value) return null;
    const date = new Date(value);
    return this.IsValid(date) ? date : null;
  }

  public ParseToDate(value: any, pattern: string = DateFormat) {
    if (typeof value !== 'string') return null;
    const date = this.Parse(value, pattern);
    return this.IsValid(date) ? date : null;
  }

  public DateFromISOString(value: any) {
    return this.Ensure(value);
  }

  public Parse(value: any, pattern: string = DateFormat) {
    return parse(value, pattern, new Date());
  }

  public Format(value: any, pattern: string = DateFormat) {
    const date = this.Ensure(value);
    return date ? _format(date, pattern) : null;
  }

  public GetUTCDate(date: Date) {
    const year = getYear(date);
    const month = getMonth(date);
    const day = getDate(date);
    return new Date(Date.UTC(year, month, day, 12, 0, 0));
  }

  public format(
    date: Date | number,
    pattern: string,
    options?: Parameters<typeof _format>[2]
  ) {
    if (!_isValid(date)) return null;
    return _format(date, pattern, options);
  }

  public compare(from: Date, to: Date): number {
    return compareDesc(from, to);
  }

  public Compare(from: Date, to: Date): number {
    return compareDesc(from, to);
  }

  public IsValid(date: any): date is Date {
    return _isValid(date);
  }

  public ToUTCDateString(value: Date): string;
  public ToUTCDateString(value?: Date | null): string | null;
  public ToUTCDateString(value?: any) {
    const date = this.Ensure(value);
    return date ? this.GetUTCDate(date).toISOString() : null;
  }

  public ToISOString(value: Date): string;
  public ToISOString(value?: Date | null): string | null;
  public ToISOString(value?: any) {
    const date = this.Ensure(value);
    return date ? date.toISOString() : null;
  }

  public StartOfDay(value?: any) {
    const date = this.Ensure(value);
    return date ? startOfDay(date) : null;
  }

  public StartOfDayToISOString(value: Date): string;
  public StartOfDayToISOString(value?: Date | null): string | null;
  public StartOfDayToISOString(value?: any) {
    const date = this.Ensure(value);
    return date ? startOfDay(date).toISOString() : null;
  }

  public EndOfDay(value?: any) {
    const date = this.Ensure(value);
    return date ? endOfDay(date) : null;
  }

  public EndOfDayToISOString(value: Date): string;
  public EndOfDayToISOString(value?: Date | null): string | null;
  public EndOfDayToISOString(value?: any) {
    const date = this.Ensure(value);
    return date ? endOfDay(date).toISOString() : null;
  }

  public IsFuture(value?: any) {
    const date = this.Ensure(value);
    return date ? isFuture(date) : false;
    // return _compareDesc(from, to);
  }

  public isValid(date: any): date is Date {
    return _isValid(date);
  }

  public getDateStringNow(): string {
    const date = new Date(Date.now());
    const days = [
      'Chủ Nhật',
      'Thứ Hai',
      'Thứ Ba',
      'Thứ Tư',
      'Thứ Năm',
      'Thứ Sáu',
      'Thứ Bảy',
    ];
    return (
      days[date.getDay()] +
      ', ngày ' +
      date.getDate() +
      ', tháng ' +
      (date.getMonth() + 1) +
      ', năm ' +
      date.getFullYear()
    );
  }
}

const instance = new DateFns();

// Implicit binding 'this' here
export const {
  IsValid,
  isValid,
  format,
  compare,
  Compare,
  EndOfDay,
  StartOfDay,
} = instance;
export default instance;
