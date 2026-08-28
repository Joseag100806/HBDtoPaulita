const EDGE_FUNCTION_URL = "https://amshjgfqklsyzixsrcbo.supabase.co/functions/v1/smart-action";

async function seleccionarOpcion(opcionElegida) {
  const buttons = document.querySelectorAll('.btn');
  const statusDiv = document.getElementById('status');

  // Deshabilitar botones para evitar múltiples clics
  buttons.forEach(btn => btn.disabled = true);
  
  // Mostrar estado de carga
  statusDiv.style.display = 'block';
  statusDiv.className = 'status-msg';
  statusDiv.textContent = 'Enviando respuesta... 💌';

  try {
    const response = await fetch(EDGE_FUNCTION_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ opcion: opcionElegida })
    });

    const data = await response.json();

    if (response.ok && data.success) {
      statusDiv.className = 'status-msg success';
      statusDiv.textContent = '¡Excelente elección! Nos vemos pronto 🥰';
    } else {
      throw new Error(data.error || 'Error inesperado');
    }
  } catch (error) {
    console.error('Error:', error);
    statusDiv.className = 'status-msg error';
    statusDiv.textContent = 'Ocurrió un error al guardar tu respuesta. ¡Inténtalo de nuevo!';
    // Reorganizar botones si falla
    buttons.forEach(btn => btn.disabled = false);
  }
}