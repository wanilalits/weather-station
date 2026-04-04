 {card.unitConversion && (
                  <div className="flex items-center text-sm">
                    <span onClick={() => { const val = convertion(i, card.value, card.title, "C", )}}>
                    
                      °C</span>
                    {/* Divider */}
                    <span className="mx-2 h-4 border-l border-gray-400"></span>
                    <span onClick={() => { convertion(i, card.value, card.title, "F", )}}>°F</span>
                  </div>
 )}