// Importando o SDK do Mercado Pago
const mercadopago = require('mercadopago');

// Configurando o Mercado Pago
mercadopago.configure({
  access_token: 'TEST-2684905602430236-052513-51d07b1caa42a7938ab7e2a9f13a7f98-135153905'
});

module.exports = async (req, res) => {
  const { items, total } = req.body;

  // Criando um objeto de preferência
  let preference = {
    items: items.map(item => ({
      title: item.title,
      quantity: item.quantity,
      currency_id: 'BRL', // Moeda
      unit_price: item.unit_price
    }))
  };

  try {
    // Criando a preferência de pagamento
    const payment = await mercadopago.preferences.create(preference);

    // Retornando o link de pagamento
    return res.status(200).json({
      status: 'success',
      init_point: payment.body.init_point
    });
  } catch (error) {
    console.error('Erro ao criar a preferência de pagamento', error);
    return res.status(500).json({
      status: 'error',
      message: 'Não foi possível criar a preferência de pagamento'
    });
  }
};
