export enum EStatusOrder {
  /**
   * Đơn hàng đang chờ xác nhận
   */
  UNCONFIRMED = 'UNCONFIRMED',
  /**
   * Đã được xác nhận đang chuẩn bị món
   */
  CONFIRMED = 'CONFIRMED',
  /**
   * Đang vận chuyển
   */
  TRANSPORT = 'TRANSPORT',
  /**
   * Đã nhận món
   */
  RECEIVED = 'RECEIVED',

  /**
   * Đã hủy món
   */
  CANCEL = 'CANCEL'
}
