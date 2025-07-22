import React, { useEffect, useRef } from 'react';
import { useCartStore } from '@/store/cartStore';
import { useBuyerStore } from '@/store/buyerStore';

declare global {
  interface Window {
    paypal?: any;
  }
}

const PayPalButton: React.FC = () => {
  const paypalButtonRef = useRef<HTMLDivElement>(null);
  const cart = useCartStore((state) => state.cart);
  const buyer = useBuyerStore((state) => state.buyer);
  const scriptLoaded = useRef(false);

  const loadPayPalScript = () => {
    return new Promise<void>((resolve, reject) => {
      if (window.paypal) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = `https://www.paypal.com/sdk/js?client-id=AaejZt7FaKfFaQlYVBuWYqTp23jCmQeoX9SXXa7kWiFm0GkzFsFzEUVMTFAnUw3XlYWqZIqCrSgUI1GO&currency=USD`;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('PayPal SDK 加载失败'));
      document.body.appendChild(script);
    });
  };

  const renderPayPalButton = async () => {
    if (!window.paypal || !paypalButtonRef.current) return;

    // 清空容器，避免重复渲染
    paypalButtonRef.current.innerHTML = '';

    // 计算总金额
    // const totalAmount = cart.reduce(
    //   (sum, item) => sum + item.price * item.quantity,
    //   0
    // ).toFixed(2);

    // 创建商品列表
    const items = cart.map(item => ({
      productName: item.name,
      unit: item.quantity,
      price: item.price.toFixed(2)
    }));

    window.paypal
      .Buttons({
        createOrder: async () => {
          try {
            const response = await fetch('/api/orders', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                buyer: buyer,
                products: items
                // amount: {
                //   currency_code: 'USD',
                //   value: totalAmount
                // }
              }),
            });

            const orderData = await response.json();
            return orderData.id;
          } catch (error) {
            console.error('创建订单失败:', error);
            throw error;
          }
        },
        onApprove: async (data: { orderID: string }) => {
          try {
            const response = await fetch(
              `/api/orders/${data.orderID}/capture`,
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
              }
            );

            const orderData = await response.json();
            // 支付成功处理
            setTimeout(()=>{
              alert('支付成功！订单ID: ' + orderData.id);
            },1200)
           
          } catch (error) {
            console.error('支付捕获失败:', error);
          }
        },
        onError: (err: Error) => {
          console.error('PayPal 错误:', err);
        }
      })
      .render(paypalButtonRef.current);
  };

  useEffect(() => {
    if (scriptLoaded.current) {
      renderPayPalButton();
      return;
    }

    loadPayPalScript()
      .then(() => {
        scriptLoaded.current = true;
        renderPayPalButton();
      })
      .catch(error => {
        console.error('加载 PayPal SDK 失败:', error);
      });

    return () => {
      // 清理工作（如果需要）
    };
  }, [cart]);

  return (
    <div>
      <div ref={paypalButtonRef} id="paypal-button-container" />
    </div>
  );
};

export default PayPalButton;