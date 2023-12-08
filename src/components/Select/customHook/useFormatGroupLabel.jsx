export default function useFormatGroupLabel() {

  const groupStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  };
  const groupBadgeStyles = {
    backgroundColor: '#EBECF0',
    borderRadius: '2em',
    color: '#172B4D',
    display: 'inline-block',
    fontSize: 12,
    fontWeight: 'normal',
    lineHeight: '1',
    minWidth: 1,
    padding: '0.16666666666667em 0.5em',
    textAlign: 'center',
  };
  const groupLabelStyles = {
    color: '#172B4D',
    display: 'inline-block',
    fontSize: 16,
    fontWeight: 700,
    lineHeight: '1',
    minWidth: 1,
    textAlign: 'center',
  };

  const formatGroupLabel = (data) => (
    <div style={groupStyles}>
      <span style={groupLabelStyles} >{data.label}</span>
      <span style={groupBadgeStyles}>{data.options.length}</span>
    </div>
  );
  return formatGroupLabel;
}
