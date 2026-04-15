const loadBoard = async () => {
  const statusText = document.getElementById('statusText');
  const tableBody = document.getElementById('boardTableBody');
  const documentList = document.getElementById('documentList');

  const response = await fetch('/users/user/boards/board', {
    headers: { Accept: 'application/json' },
  });

  if (!response.ok) {
    statusText.textContent = 'Could not load board.';
    return;
  }

  statusText.textContent = 'Board loading...';

  const board = await response.json();

  tableBody.innerHTML = '';
  documentList.innerHTML = '';

  if (!board) {
    statusText.textContent = 'Board data is not available.';
    return;
  }

  statusText.textContent = 'Board loaded.';

  if (board.panels.length === 0) {
    tableBody.innerHTML = '<tr><td>-</td><td>-</td><td>-</td></tr>';
    documentList.innerHTML = '<option>No panels</option>';
    return;
  }

  board.panels.forEach((file, index) => {
    const row = document.createElement('tr');
    const titleCell = document.createElement('td');
    const textCell = document.createElement('td');
    const dateCell = document.createElement('td');
    const option = document.createElement('option');

    titleCell.textContent = file.title;
    textCell.textContent = file.text;
    dateCell.textContent = file.createdAt;

    option.value = file.id;
    option.textContent = titleCell.textContent;

    row.appendChild(titleCell);
    row.appendChild(textCell);
    row.appendChild(dateCell);
    tableBody.appendChild(row);
    documentList.appendChild(option);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('rescanButton').addEventListener('click', loadBoard);
  document.getElementById('printButton').addEventListener('click', () => window.print());

  loadBoard().catch(() => {
    document.getElementById('statusText').textContent = 'Unable to load board data.';
  });
});
