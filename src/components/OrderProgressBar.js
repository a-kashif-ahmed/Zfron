const OrderProgress = ({ status }) => {
  const stages = ['pending', 'paid', 'shipped', 'delivered',];
  const currentStage = stages.includes(status) ? stages.indexOf(status) : -1;
  if(status === 'cancelled'){
    stages.push('cancelled');
  }
  return (
    <div className="mt-4">
      <div className="flex items-center justify-between relative">
        {stages.map((stage, index) => (
          <div className="flex flex-col items-center flex-1" key={stage}>
            {/* Circle */}
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white z-10
              ${index <= currentStage ? 'bg-blue-600' : 'bg-gray-300'}`}
            >
              {index + 1}
            </div>
            {/* Label */}
            <p className="text-sm mt-1">{stage}</p>
            {/* Line */}
            {index < stages.length - 1 && (
              <div className="absolute top-3 left-0 w-full h-1 bg-gray-300 z-0">
                <div
                  className="h-1 bg-blue-600"
                  style={{
                    width: `${(currentStage / (stages.length - 1)) * 100}%`
                  }}
                ></div>
              </div>
            )}
          </div>
        ))}
      </div>

      {status === 'cancelled' && (
        <div className="mt-2 text-red-500 font-semibold text-center">Order Cancelled</div>
      )}
    </div>
  );
};


export default OrderProgress;