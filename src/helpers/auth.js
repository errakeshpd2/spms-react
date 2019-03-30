module.exports = {
  customValidationMessages: { 
    required: 'required',
    numeric: 'must be a number' 
  },

  activityLogValidationRules: {
    data: {
      attributes: {
        activity: 'required',
        ticket_id: 'required',
        log_date: 'required',
        log_time: ['required','numeric']
      }
    },
  },

  ticketValidationRules: {
    data: {
      attributes: {
        title: 'required',
        ticket_no: 'required',
        project_id: 'required',
        start_date: 'required',
        maximum_permitted_time: 'numeric'
      }
    },
  }
}
