const toastedMixin = {
  methods: {
    showToasted(content, type, duration = 2500) {
      const toastedContent = content;
      const toastedConfiguration = {
        theme: "toasted-primary",
        type,
        position: "bottom-right",
        duration
      };

      this.$toasted.show(toastedContent, toastedConfiguration);
    }
  }
};
export default toastedMixin;
