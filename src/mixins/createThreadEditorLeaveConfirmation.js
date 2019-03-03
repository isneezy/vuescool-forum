const createThreadEditorMixin = (editorRef) => ({
  data: () => ({
    threadEditorLeaveConfirmation_isSaved: false
  }),
  computed: {
    threadEditorLeaveConfirmation_hasUnsavedChanges () {
      const editor = this.$refs[editorRef]
      return (editor.form.title || editor.form.text) && !this.threadEditorLeaveConfirmation_isSaved
    }
  },
  methods: {
    threadEditorLeaveConfirmation_saved () {
      this.threadEditorLeaveConfirmation_isSaved = true
    }
  },
  beforeRouteLeave (to, from, next) {
    if (this.threadEditorLeaveConfirmation_hasUnsavedChanges) {
      const confirmed = window.confirm('Are you sure you want to leave? Unsaved changes will be lost.')
      if (confirmed) next()
      else next(false)
    } else {
      next()
    }
  }
})

export default createThreadEditorMixin
