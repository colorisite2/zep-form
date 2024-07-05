import { reactExtension, RenderExtensionPoint } from '@shopify/ui-extensions-react/admin';
import { Button } from '@shopify/polaris';

export default reactExtension('Admin::OrderDetails::MoreActions', () => (
  <App />
));

function App() {
  const handleClick = async () => {
    const orderId = '{{order.id}}'; // Shopify va înlocui aceasta cu ID-ul comenzii
    const customerEmail = '{{order.customer.email}}'; // Shopify va înlocui aceasta cu emailul clientului

    const response = await fetch('/send-survey', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        orderId,
        customerEmail,
      }),
    });

    if (response.ok) {
      console.log('Survey sent');
    } else {
      console.error('Error sending survey');
    }
  };

  return <Button primary onClick={handleClick}>Trimite Survey</Button>;
}
