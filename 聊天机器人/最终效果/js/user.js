// 用户登录和注册的表单项验证的通用代码

class FieldValidator {
  /**
   * 构造器
   * @param {String} txtId 文本框的id
   * @param {Function} validatorFunc 验证规则函数，当需要对文本框进行验证时，会调用该函数，函数的参数为当前文本框的值，函数的返回值为验证的错误消息，若没有返回，则表示无错误
   */
  constructor(txtId, validatorFunc) {
    this.input = $("#" + txtId);
    this.p = this.input.nextElementSibling;
    this.validatorFunc = validatorFunc;
    // 失去焦点出发
    this.input.onblur = () => {
      this.validate();
    };
  }

  /**
   * 验证，成功返回true，失败返回false
   */
  async validate() {
    const err = await this.validatorFunc(this.input.value);
    if (err) {
      // 有错误
      this.p.innerText = err;
      return false;
    } else {
      this.p.innerText = "";
      return true;
    }
  }

  static async validate(...validators) {
    const proms = validators.map((v) => v.validate());
    const results = await Promise.all(proms);
    // every 判断是否数组所有的元素都满足条件
    return results.every((r) => r);
  }
}
