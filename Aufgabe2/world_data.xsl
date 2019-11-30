<?xml version="1.0"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.1">
<xsl:output method="html" encoding="utf-8" doctype-public="-//W3C//DTD HTML 4.01 Transitional//DE"/>

    <xsl:template match="/">
        <xsl:for-each select="Countries/Country">
            <tr>
                <td><xsl:value-of select="id"/></td>
                <td><xsl:value-of select="name"/></td>
                <td><xsl:value-of select="birth"/></td>
                <td><xsl:value-of select="cell"/></td>
                <td><xsl:value-of select="children"/></td>
                <td><xsl:value-of select="electricity"/></td>
                <td><xsl:value-of select="internet"/></td>
            </tr>
        </xsl:for-each>
    </xsl:template>
</xsl:stylesheet>