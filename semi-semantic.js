/**
 * semi_semantic library
 * Allows parsing and sorting semi-semantic versions
 */
module.exports = function() {
  var semi_semantic = this;

  var pattern = "^(v?)([0-9]+(?:\\.[0-9]+)*)(-[0-9a-zA-Z.-]+)?(\\+[0-9a-zA-Z.-]+)?$";
  var matcher = RegExp(pattern);

  this.Version = function() {
    this.prefix = null;
    this.release = new Array();
    this.pre_release = null;
    this.post_release = null;

    this.toString = function() {
      var version_string = "";
      if ( this.prefix ) {
        version_string += this.prefix;
      }
      version_string += this.release.join('.');
      if ( this.pre_release ) {
        version_string += "-";
        version_string += this.pre_release.join('.');
      }
      if ( this.post_release ) {
        version_string += "+";
        version_string += this.post_release.join('.');
      }
      return version_string;
    };
    return this;
  };

  this.parse = function(version_string) {
    var matches = matcher.exec(version_string);
    if ( ! matches ) {
      return null;
    }
    var version = new semi_semantic.Version();
    // optional prefix
    if ( matches[1] ) {
      version.prefix = matches[1];
    }
    // required release
    version.release = semi_semantic.parse_segment(matches[2]);
    // optional pre_release
    if ( matches[3] ) {
      // strip '-'
      version.pre_release = semi_semantic.parse_segment(matches[3].substring(1));
    }
    // optional post_release
    if ( matches[4] ) {
      // strip '+'
      version.post_release = semi_semantic.parse_segment(matches[4].substring(1));
    }
    return version;
  };

  this.parse_segment = function(segment_string) {
    return segment_string.split('.');
  }

  this.sort_segments = function(a, b) {
    // each segment is an array of components
    var min_length = Math.min(a.length, b.length);
    for (var i = 0; i < min_length; i++) {
      if ( a[i] < b[i] ) {
        return -1;
      }
      if ( a[i] > b[i] ) {
        return 1;
      }
    }
    // assume more components means newer
    if ( a.length < b.length ) {
      return -1;
    }
    if ( a.length > b.length ) {
      return 1;
    }
    // a and b are equal length and equal content
    return 0;
  };

  this.sort = function(a, b) {
    // compare required release segments
    var release_result = semi_semantic.sort_segments(a.release, b.release);
    if ( release_result != 0 ) {
      return release_result;
    }

    // compare optional pre_release segments
    if ( a.pre_release != null && b.pre_release != null ) {
      // a and b both have a pre_release segment
      var pre_release_result = semi_semantic.sort_segments(a.pre_release, b.pre_release);
      if ( pre_release_result != 0 ) {
        return pre_release_result;
      }
    } else if ( a.pre_release != null ) {
      // a has pre_release and b does not
      // a is older
      return -1;
    } else if ( b.pre_release != null ) {
      // b has pre_release and a does not
      // a is newer
      return 1;
    }
    // a and b have equal pre_release or neither have a pre_release

    // compare optional post_release segments
    if ( a.post_release != null && b.post_release != null ) {
      // a and b both have a post_release segment
      var post_release_result = semi_semantic.sort_segments(a.post_release, b.post_release);
      if ( post_release_result != 0 ) {
        return post_release_result;
      }
    } else if ( a.post_release != null ) {
      // a has post_release and b does not
      // a is newer
      return 1;
    } else if ( b.post_release != null ) {
      // b has post_release and a does not
      // a is older
      return -1;
    }
    // a and b have equal post_release or neither have a post_release

    // a must be equal to b
    return 0;
  };

  return this;
};
