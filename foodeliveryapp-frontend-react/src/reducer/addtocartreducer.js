// Initial state
export const initialState = {
  orderFood: [],
  totalDishCount: 0,
  totalPrice: 0,
};

export const addToCartReducerFunction = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const { dishName, quantity, hotelName, price } = action.payload;
      const existingHotelIndex = state.orderFood.findIndex(item => item.hotelName === hotelName);

      if (existingHotelIndex !== -1) {
        const updatedOrderFood = state.orderFood.map(hotel => {
          if (hotel.hotelName === hotelName) {
            const existingDishIndex = hotel.orders.findIndex(order => order.dishName === dishName);

            if (existingDishIndex !== -1) {
              const updatedOrders = hotel.orders.map(order => {
                if (order.dishName === dishName) {
                  const newQuantity = order.quantity + quantity;
                  return {
                    ...order,
                    quantity: newQuantity,
                    price: newQuantity * price,
                  };
                }
                return order;
              });

              return {
                ...hotel,
                orders: updatedOrders,
              };
            } else {
              return {
                ...hotel,
                orders: [...hotel.orders, { dishName, quantity, price: quantity * price }],
              };
            }
          }
          return hotel;
        });

        return {
          ...state,
          orderFood: updatedOrderFood,
          totalDishCount: state.totalDishCount + quantity,
          totalPrice: state.totalPrice + quantity * price,
        };
      } else {
        return {
          ...state,
          orderFood: [
            ...state.orderFood,
            {
              hotelName,
              orders: [{ dishName, quantity, price: quantity * price }],
            },
          ],
          totalDishCount: state.totalDishCount + quantity,
          totalPrice: state.totalPrice + quantity * price,
        };
      }

      case 'REMOVE_FROM_CART':
        const { dishName: dishToRemove, quantity: quantityToRemove, hotelName: hotelToRemove, price: priceToRemove } = action.payload;
        const hotelToRemoveIndex = state.orderFood.findIndex(item => item.hotelName === hotelToRemove);
      
        if (hotelToRemoveIndex !== -1) {
          const updatedOrderFood = state.orderFood.map(hotel => {
            if (hotel.hotelName === hotelToRemove) {
              const existingDish = hotel.orders.find(order => order.dishName === dishToRemove);
      
              if (existingDish) {
                if (existingDish.quantity > quantityToRemove) {
                  // If the existing quantity is greater than quantity to remove, update the quantity and price
                  const updatedOrders = hotel.orders.map(order => {
                    if (order.dishName === dishToRemove) {
                      return {
                        ...order,
                        quantity: order.quantity - quantityToRemove,
                        price: order.price - quantityToRemove * priceToRemove,
                      };
                    }
                    return order;
                  });
      
                  return {
                    ...hotel,
                    orders: updatedOrders,
                  };
                } else {
                  // If the existing quantity is less than or equal to quantity to remove, remove the entire dish
                  const updatedOrders = hotel.orders.filter(order => order.dishName !== dishToRemove);
      
                  // Check if the updated orders array is empty, and if so, filter out the hotel
                  if (updatedOrders.length === 0) {
                    return null; // Returning null removes the hotel from orderFood
                  }
      
                  return {
                    ...hotel,
                    orders: updatedOrders,
                  };
                }
              }
            }
            return hotel;
          }).filter(Boolean);
          return {
            ...state,
            orderFood: updatedOrderFood,
            totalDishCount: state.totalDishCount - quantityToRemove,
            totalPrice: state.totalPrice - quantityToRemove * priceToRemove,
          };
        }
        break;
  case 'INCREASE_QUANTITY':
    const { dishName: dishToIncrease, hotelName: hotelToIncrease, price: priceToIncrease } = action.payload;
    const hotelToIncreaseIndex = state.orderFood.findIndex(item => item.hotelName === hotelToIncrease);
  
    if (hotelToIncreaseIndex !== -1) {
      const updatedOrderFood = state.orderFood.map(hotel => {
        if (hotel.hotelName === hotelToIncrease) {
          const updatedOrders = hotel.orders.map(order => {
            if (order.dishName === dishToIncrease) {
              return {
                ...order,
                quantity: order.quantity + 1,
                price: (order.quantity + 1) * priceToIncrease,
              };
            }
            return order;
          });
  
          return {
            ...hotel,
            orders: updatedOrders,
          };
        }
        return hotel;
      });
  
      return {
        ...state,
        orderFood: updatedOrderFood,
        totalDishCount: state.totalDishCount + 1,
        totalPrice: state.totalPrice + priceToIncrease,
      };
    }
    break;
    default:
      return state;
  }
};
