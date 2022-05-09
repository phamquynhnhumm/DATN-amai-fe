export  enum EStatusOrder{
  /**
   * Đơn hàng đang chờ xác nhận
   */
  UNCONFIRMED,
  /**
   * Đã được xác nhận đang chuẩn bị món
   */
  CONFIRMED,
  /**
   * Đang vận chuyển
   */
  TRANSPORT,
  /**
   * Đã nhận món
   */
  RECEIVED,

  /**
   * Đã hủy món
   */
  CANCEL
}
